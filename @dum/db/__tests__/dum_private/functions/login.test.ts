import { PoolClient } from "pg";

import { snapshotSafe, withRootDb } from "../../helpers";
import { reallyCreateUser } from "./really_create_user.test";

export async function login(
  client: PoolClient,
  email: string | null,
  password: string | null
) {
  const {
    rows: [row],
  } = await client.query(`select * from dum_private.login($1, $2)`, [
    email,
    password,
  ]);
  return row;
}

const EMAIL = "email@example.com";
const EmAiL = "email@eXaMpLe.cOm";
const PASSWORD = "!TestPassword!";

async function setupTestUser(client: PoolClient) {
  return reallyCreateUser(
    client,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    EMAIL,
    PASSWORD
  );
}

it("can login with email+password", () =>
  withRootDb(async (client) => {
    const testUser = await setupTestUser(client);
    const session = await login(client, EMAIL, PASSWORD);
    expect(session).toBeTruthy();
    expect(session.user_id).toEqual(testUser.id);
    expect(snapshotSafe(session)).toMatchInlineSnapshot(`
      Object {
        "created_at": "[DATE]",
        "last_active": "[DATE]",
        "user_id": "[ID]",
        "uuid": "[UUID]",
      }
    `);
  }));

it("can login with EmAiL+password", () =>
  withRootDb(async (client) => {
    const testUser = await setupTestUser(client);
    const session = await login(client, EmAiL, PASSWORD);
    expect(session).toBeTruthy();
    expect(session.user_id).toEqual(testUser.id);
    expect(snapshotSafe(session)).toMatchInlineSnapshot(`
      Object {
        "created_at": "[DATE]",
        "last_active": "[DATE]",
        "user_id": "[ID]",
        "uuid": "[UUID]",
      }
    `);
  }));

it("cannot login with wrong password", () =>
  withRootDb(async (client) => {
    await setupTestUser(client);
    const session = await login(client, EMAIL, "WRONG" + PASSWORD);
    // Don't care if the session is null or just the user_id is null
    expect(session && session.user_id).toBe(null);
    // NOTE: we don't throw an error because we track wrong password attempts
  }));

it("prevents too many login attempts", () =>
  withRootDb(async (client) => {
    await setupTestUser(client);
    await login(client, EMAIL, "WRONG" + PASSWORD).catch(() => {});
    await login(client, EMAIL, "WRONG" + PASSWORD).catch(() => {});
    await login(client, EMAIL, "WRONG" + PASSWORD).catch(() => {});
    const promise = login(client, EMAIL, PASSWORD);
    expect(promise).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Cuenta Bloqueada - muchos intentos de inicio de sesión. Intenta de nuevo despúes de 5 minutos."`
    );
    expect(promise).rejects.toMatchObject({ code: "LOCKD" });
  }));

it("too many login attempts resets after 5 minutes", () =>
  withRootDb(async (client) => {
    const testUser = await setupTestUser(client);
    await login(client, EMAIL, "WRONG" + PASSWORD).catch(() => {});
    await login(client, EMAIL, "WRONG" + PASSWORD).catch(() => {});
    await login(client, EMAIL, "WRONG" + PASSWORD).catch(() => {});
    // Too many attempts
    const {
      rows: [secrets],
    } = await client.query(
      "select * from dum_private.user_secrets where user_id = $1",
      [testUser.id]
    );
    expect(snapshotSafe(secrets)).toMatchInlineSnapshot(`
      Object {
        "delete_account_token": null,
        "delete_account_token_generated": null,
        "failed_password_attempts": 3,
        "failed_reset_password_attempts": 0,
        "first_failed_password_attempt": "[DATE]",
        "first_failed_reset_password_attempt": null,
        "last_login_at": "[DATE]",
        "password_hash": "[hash]",
        "reset_password_token": null,
        "reset_password_token_generated": null,
        "user_id": "[ID]",
      }
    `);
    const {
      rows: [{ now }],
    } = await client.query("select now()");
    // Because we're in a transaction, it failed now
    expect(secrets.first_failed_password_attempt).toEqual(now);

    // Now turn the clock forward 5 minutes
    await client.query(
      "update dum_private.user_secrets set first_failed_password_attempt = now() - interval '5 minutes' where user_id = $1",
      [testUser.id]
    );

    const session = await login(client, EMAIL, PASSWORD);
    expect(session).toBeTruthy();
    expect(session.user_id).toEqual(testUser.id);
  }));
