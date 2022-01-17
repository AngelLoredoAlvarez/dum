import { Pool, PoolClient } from "pg";

const pools = {};

if (!process.env.TEST_DATABASE_URL) {
  throw new Error("Cannot run tests without a TEST_DATABASE_URL");
}
export const TEST_DATABASE_URL: string = process.env.TEST_DATABASE_URL;

export type User = {
  id: string;
  username: string;
  _password?: string;
  _email?: string;
};

// Make sure we release those pgPools so that our tests exit!
afterAll(() => {
  const keys = Object.keys(pools);
  return Promise.all(
    keys.map(async (key) => {
      try {
        const pool = pools[key];
        delete pools[key];
        await pool.end();
      } catch (e) {
        console.error("Failed to release connection!");
        console.error(e);
      }
    })
  );
});

export const poolFromUrl = (url: string) => {
  if (!pools[url]) {
    pools[url] = new Pool({ connectionString: url });
  }
  return pools[url];
};

export const deleteTestUsers = () => {
  // We're not using withRootDb because we don't want the transaction rolled back
  const pool = poolFromUrl(TEST_DATABASE_URL);
  return pool.query(
    `
      delete from dum_public.users
      where username like 'testuser%'
      or username = 'testuser'
      or id in
        (
          select user_id from dum_public.user_emails where email like 'testuser%@example.com'
        union
          select user_id from dum_public.user_authentications where service = 'facebook' and identifier = '123456%'
        )
      `
  );
};

export const deleteTestData = async () => {
  await deleteTestUsers();
};

/* Quickly becomes root, does the thing, and then reverts back to previous role */
export const asRoot = async <T>(
  client: PoolClient,
  callback: (client: PoolClient) => Promise<T>
): Promise<T> => {
  const {
    rows: [{ role }],
  } = await client.query("select current_setting('role') as role");
  await client.query("reset role");
  try {
    return await callback(client);
  } finally {
    try {
      await client.query("select set_config('role', $1, true)", [role]);
    } catch (e) {
      // Transaction was probably aborted, don't clobber the error
    }
  }
};

/******************************************************************************/

// Enables multiple calls to `createUsers` within the same test to still have
// deterministic results without conflicts.
let userCreationCounter = 0;
beforeEach(() => {
  userCreationCounter = 0;
});

export const createUsers = async function createUsers(
  client: PoolClient,
  count: number = 1,
  verified: boolean = true
) {
  const users = [];
  if (userCreationCounter > 25) {
    throw new Error("Too many users created!");
  }
  for (let i = 0; i < count; i++) {
    const userLetter = "abcdefghijklmnopqrstuvwxyz"[userCreationCounter];
    userCreationCounter++;
    const password = userLetter.repeat(12);
    const email = `${userLetter}${i || ""}@b.c`;
    const user: User = (
      await client.query(
        `SELECT * FROM dum_private.really_create_user(
          name := $1,
          first_surname := $2,
          second_surname := $3,
          username := $4,
          avatar_url := $5,
          email := $6,
          password := $7,
          email_is_verified := $8
      )`,
        [
          "test_name",
          "test_first_surname",
          "test_second_surname",
          `testuser_${userLetter}`,
          null,
          email,
          password,
          verified,
        ]
      )
    ).rows[0];
    expect(user.id).not.toBeNull();
    user._email = email;
    user._password = password;
    users.push(user);
  }
  return users;
};

/******************************************************************************/

export const createSession = async (
  client: PoolClient,
  userId: string
): Promise<{ uuid: string }> => {
  const {
    rows: [session],
  } = await client.query(
    `
      insert into dum_private.sessions (user_id)
      values ($1::uuid)
      returning *
    `,
    [userId]
  );
  return session;
};
