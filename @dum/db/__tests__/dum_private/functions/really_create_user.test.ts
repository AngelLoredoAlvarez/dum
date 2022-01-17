import { PoolClient } from "pg";

import { snapshotSafe, withRootDb } from "../../helpers";

export async function reallyCreateUser(
  client: PoolClient,
  name: string | null,
  first_surname: string | null,
  second_surname: string | null,
  username: string | null,
  avatarUrl: string | null,
  email: string | null,
  password: string | null,
  emailIsVerified: boolean = false
) {
  const {
    rows: [row],
  } = await client.query(
    `
      select new_user.* from dum_private.really_create_user(
        name => $1,
        first_surname => $2,
        second_surname => $3,
        username => $4,
        avatar_url => $5,
        email => $6,
        password => $7,
        email_is_verified => $8
      ) new_user
      `,
    [
      name,
      first_surname,
      second_surname,
      username,
      avatarUrl,
      email,
      password,
      emailIsVerified,
    ]
  );
  return row;
}

test("can register user with a password", () =>
  withRootDb(async (client) => {
    // Normally PassportLoginPlugin will call this SQL function directly.
    const user = await reallyCreateUser(
      client,
      "test",
      "test_first_surname",
      "test_second_surname",
      "test_username",
      "http://example.com",
      "testuser@example.com",
      "SuperSecurePassword1"
    );
    expect(user).not.toBeNull();
    expect(snapshotSafe(user)).toMatchInlineSnapshot(`
      Object {
        "avatar_url": "http://example.com",
        "created_at": "[DATE]",
        "first_surname": "test_first_surname",
        "id": "[ID]",
        "is_admin": false,
        "is_verified": false,
        "name": "test",
        "second_surname": "test_second_surname",
        "updated_at": "[DATE]",
        "username": "test_username",
      }
    `);
  }));

test("cannot register with a weak password", () =>
  withRootDb(async (client) => {
    const promise = reallyCreateUser(
      client,
      "test",
      "test_first_surname",
      "test_second_surname",
      "test_username",
      "http://example.com",
      "testuser@example.com",
      "WEAK"
    );
    await expect(promise).rejects.toMatchInlineSnapshot(
      `[error: Password is too weak]`
    );
    await expect(promise).rejects.toHaveProperty("code", "WEAKP");
  }));

test("can register user with just a username and email", () =>
  withRootDb(async (client) => {
    // Normally PassportLoginPlugin will call this SQL function directly.
    const user = await reallyCreateUser(
      client,
      null,
      null,
      null,
      "test_username",
      null,
      "testuser@example.com",
      null
    );
    expect(user).not.toBeNull();
    expect(snapshotSafe(user)).toMatchInlineSnapshot(`
      Object {
        "avatar_url": null,
        "created_at": "[DATE]",
        "first_surname": null,
        "id": "[ID]",
        "is_admin": false,
        "is_verified": false,
        "name": null,
        "second_surname": null,
        "updated_at": "[DATE]",
        "username": "test_username",
      }
    `);
  }));

test("cannot register user without email", () =>
  withRootDb(async (client) => {
    // Normally PassportLoginPlugin will call this SQL function directly.
    const promise = reallyCreateUser(
      client,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
    await expect(promise).rejects.toMatchInlineSnapshot(
      `[error: Email is required]`
    );
    await expect(promise).rejects.toMatchObject({
      code: "MODAT",
    });
  }));
