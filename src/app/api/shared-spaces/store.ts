export interface ServerSpaceMember {
  userId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  avatar?: string;
  joinedAt: string;
  token?: string;
}

export interface ServerSharedSpace {
  id: string;
  name: string;
  description?: string;
  currency: string;
  ownerId: string;
  ownerName: string;
  inviteCode: string;
  createdAt: string;
  members: ServerSpaceMember[];
}

export interface SpaceResourceStore {
  accounts: Map<string, any>;
  movements: Map<string, any>;
  events: Map<string, any>;
  investments: Map<string, any>;
  budgets: Map<string, any>;
  categories: Map<string, any>;
  payments: Map<string, any>;
  heritages: Map<string, any>;
}

// In-memory persistent server registry across API route invocations
declare global {
  // eslint-disable-next-line no-var
  var __SHARED_SPACES_REGISTRY__: Map<string, ServerSharedSpace> | undefined;
  // eslint-disable-next-line no-var
  var __SPACE_CODES_INDEX__: Map<string, string> | undefined; // inviteCode -> spaceId
  // eslint-disable-next-line no-var
  var __SPACE_RESOURCE_STORES__: Map<string, SpaceResourceStore> | undefined;
  // eslint-disable-next-line no-var
  var __MEMBER_TOKENS_MAP__: Map<string, string> | undefined; // userId/email -> token
}

if (!global.__SHARED_SPACES_REGISTRY__) {
  global.__SHARED_SPACES_REGISTRY__ = new Map<string, ServerSharedSpace>();
}

if (!global.__SPACE_CODES_INDEX__) {
  global.__SPACE_CODES_INDEX__ = new Map<string, string>();
}

if (!global.__SPACE_RESOURCE_STORES__) {
  global.__SPACE_RESOURCE_STORES__ = new Map<string, SpaceResourceStore>();
}

if (!global.__MEMBER_TOKENS_MAP__) {
  global.__MEMBER_TOKENS_MAP__ = new Map<string, string>();
}

export const spacesRegistry = global.__SHARED_SPACES_REGISTRY__;
export const codesIndex = global.__SPACE_CODES_INDEX__;
export const spaceResourceStores = global.__SPACE_RESOURCE_STORES__;
export const memberTokensMap = global.__MEMBER_TOKENS_MAP__;

export function getOrCreateSpaceStore(spaceId: string): SpaceResourceStore {
  if (!spaceResourceStores.has(spaceId)) {
    spaceResourceStores.set(spaceId, {
      accounts: new Map(),
      movements: new Map(),
      events: new Map(),
      investments: new Map(),
      budgets: new Map(),
      categories: new Map(),
      payments: new Map(),
      heritages: new Map(),
    });
  }
  return spaceResourceStores.get(spaceId)!;
}

/**
 * Generates a unique, non-colliding 6-character uppercase code
 */
export function generateUniqueCode(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // 32 characters, no ambiguous 0/O, 1/I
  let code = "";
  let attempts = 0;

  do {
    code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    attempts++;
  } while (codesIndex.has(code) && attempts < 100);

  return code;
}
