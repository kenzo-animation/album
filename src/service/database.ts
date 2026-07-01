import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { stickersList } from '@/data/stickers';

const dbName = 'appdata';

let db: SQLiteDBConnection | null = null;
let initialized = false;

const sqliteConnection = new SQLiteConnection(CapacitorSQLite);

interface UserRow {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

interface StickerRow {
  id: number;
  userId: number;
  stickerId: number;
  nome: string;
  selecao: string;
  foto: string;
  coletada: number;
}

async function ensureDatabase() {
  if (initialized && db) {
    return;
  }

  if (!db) {
    db = await sqliteConnection.createConnection(dbName, false, 'no-encryption', 1, false);
  }

  await db.open();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS figurinhas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      sticker_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      selecao TEXT NOT NULL,
      foto TEXT NOT NULL,
      coletada INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
      UNIQUE(user_id, sticker_id)
    );
  `);

  initialized = true;
}

function getDb() {
  if (!db) {
    throw new Error('Banco de dados ainda não inicializado');
  }

  return db;
}

export async function initDatabase() {
  await ensureDatabase();
}

export async function clearDatabase() {
  await ensureDatabase();
  await getDb().execute('DELETE FROM figurinhas;');
  await getDb().execute('DELETE FROM usuarios;');
}

export async function createUser(input: { nome: string; email: string; senha: string }) {
  await ensureDatabase();
  const result = await getDb().run(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);',
    [input.nome, input.email, input.senha]
  );

  return {
    id: Number((result as any).insertId ?? 0),
    nome: input.nome,
    email: input.email,
    senha: input.senha,
  };
}

export async function findUserByEmail(email: string) {
  await ensureDatabase();
  const result = await getDb().query('SELECT * FROM usuarios WHERE email = ?;', [email]);
  return (result.values?.[0] as UserRow | undefined) ?? null;
}

export async function findUserByEmailAndPassword(email: string, senha: string) {
  await ensureDatabase();
  const result = await getDb().query('SELECT * FROM usuarios WHERE email = ? AND senha = ?;', [email, senha]);
  return (result.values?.[0] as UserRow | undefined) ?? null;
}

export async function createOrSeedStickerCollection(userId: number) {
  await ensureDatabase();
  const existing = await getDb().query('SELECT COUNT(*) as count FROM figurinhas WHERE user_id = ?;', [userId]);
  const count = Number((existing.values?.[0] as any)?.count ?? 0);

  if (count === 0) {
    const values = stickersList.map((sticker) => [
      userId,
      sticker.id,
      sticker.nome,
      sticker.selecao,
      sticker.foto,
      sticker.coletada ? 1 : 0,
    ]);

    for (const row of values) {
      await getDb().run(
        'INSERT INTO figurinhas (user_id, sticker_id, nome, selecao, foto, coletada) VALUES (?, ?, ?, ?, ?, ?);',
        row
      );
    }
  }

  const rows = await getDb().query('SELECT * FROM figurinhas WHERE user_id = ? ORDER BY id;', [userId]);
  return (rows.values || []).map((row: any) => ({
    id: Number(row.id),
    userId: Number(row.user_id),
    stickerId: Number(row.sticker_id),
    nome: row.nome,
    selecao: row.selecao,
    foto: row.foto,
    coletada: Number(row.coletada) === 1 ? 1 : 0,
  })) as unknown as StickerRow[];
}

export async function getStickersForUser(userId: number) {
  await ensureDatabase();
  const result = await getDb().query('SELECT * FROM figurinhas WHERE user_id = ? ORDER BY id;', [userId]);
  return (result.values || []).map((row: any) => ({
    id: Number(row.id),
    userId: Number(row.user_id),
    stickerId: Number(row.sticker_id),
    nome: row.nome,
    selecao: row.selecao,
    foto: row.foto,
    coletada: Number(row.coletada) === 1,
  }));
}

export async function toggleSticker(userId: number, stickerId: number, coletada: boolean) {
  await ensureDatabase();
  await getDb().run('UPDATE figurinhas SET coletada = ? WHERE user_id = ? AND sticker_id = ?;', [coletada ? 1 : 0, userId, stickerId]);
  const row = await getDb().query('SELECT * FROM figurinhas WHERE user_id = ? AND sticker_id = ?;', [userId, stickerId]);
  const value = row.values?.[0] as any;
  return {
    id: Number(value.id),
    userId: Number(value.user_id),
    stickerId: Number(value.sticker_id),
    nome: value.nome,
    selecao: value.selecao,
    foto: value.foto,
    coletada: Number(value.coletada) === 1,
  };
}

export async function addContato(nome: string, email: string, telefone: string) {
  await ensureDatabase();
  await getDb().run('INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?);', [nome, email, telefone]);
}

export async function listContatos() {
  await ensureDatabase();
  const result = await getDb().query('SELECT * FROM contatos;');
  return result.values || [];
}

export async function deleteContatoById(id: number) {
  await ensureDatabase();
  return getDb().run('DELETE FROM contatos WHERE id = ?;', [id]);
}

export async function updateContato(id: number, nome: string, email: string, telefone: string) {
  await ensureDatabase();
  await getDb().run('UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?;', [nome, email, telefone, id]);
}