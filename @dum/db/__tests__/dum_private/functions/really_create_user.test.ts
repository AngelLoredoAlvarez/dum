import { PoolClient } from "pg";

import { snapshotSafe, withRootDb } from "../../helpers";

export async function reallyCreateUser(
  client: PoolClient,
  name: string | null,
  first_surname: string | null,
  second_surname: string | null,
  town_id: string | null,
  suburb_id: string | null,
  street_id: string | null,
  exterior_number: string | null,
  interior_number: string | null,
  phone_one: string | null,
  phone_two: string | null,
  phone_three: string | null,
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
        town_id => $4,
        suburb_id => $5,
        street_id => $6,
        exterior_number => $7,
        interior_number => $8,
        phone_one => $9,
        phone_two => $10,
        phone_three => $11,
        avatar_url => $12,
        email => $13,
        password => $14,
        email_is_verified => $15
      ) new_user
      `,
    [
      name,
      first_surname,
      second_surname,
      town_id,
      suburb_id,
      street_id,
      exterior_number,
      interior_number,
      phone_one,
      phone_two,
      phone_three,
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
      "84673058-eca2-42b1-bd94-84b1ece47c0c",
      "c5ef579f-61d5-4441-82a5-108247ec4058",
      "be283c11-e280-43c8-bb58-797c53903821",
      "111",
      null,
      "(487) 111 1111",
      "(487) 111 1111",
      null,
      "http://example.com",
      "testuser@example.com",
      "SuperSecurePassword1"
    );
    expect(user).not.toBeNull();
    expect(snapshotSafe(user)).toMatchInlineSnapshot(`
      Object {
        "avatar_url": "http://example.com",
        "created_at": "[DATE]",
        "first_surname": "TEST_FIRST_SURNAME",
        "id": "[ID]",
        "is_admin": false,
        "is_verified": false,
        "name": "TEST",
        "second_surname": "TEST_SECOND_SURNAME",
        "updated_at": "[DATE]",
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
      null,
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

test("cannot register with a weak password", () =>
  withRootDb(async (client) => {
    const promise = reallyCreateUser(
      client,
      "test",
      "test_first_surname",
      "test_second_surname",
      "84673058-eca2-42b1-bd94-84b1ece47c0c",
      "c5ef579f-61d5-4441-82a5-108247ec4058",
      "be283c11-e280-43c8-bb58-797c53903821",
      "111",
      null,
      "(487) 111 1111",
      "(487) 111 1111",
      null,
      "http://example.com",
      "testuser@example.com",
      "WEAK"
    );
    await expect(promise).rejects.toMatchInlineSnapshot(
      `[error: Password is too weak]`
    );
    await expect(promise).rejects.toHaveProperty("code", "WEAKP");
  }));

test("can register user with just an email", () =>
  withRootDb(async (client) => {
    // Normally PassportLoginPlugin will call this SQL function directly.
    const user = await reallyCreateUser(
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
      }
    `);
  }));
