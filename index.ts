import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Create an in-memory database
const db: { [key: string]: any } = {};

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// GET api/users
app.get('/api/users', (req: Request, res: Response) => {
  const users = Object.values(db);
  res.status(200).json(users);
});

// GET api/users/{userId}
app.get('/api/users/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!isValidUUID(userId)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }

  const user = db[userId];
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
});

// POST api/users
app.post('/api/users', (req: Request, res: Response) => {
  const { username, age, hobbies = [] } = req.body;

  if (!username || !age) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const id = uuidv4();
  const newUser = { id, username, age, hobbies };
  db[id] = newUser;

  res.status(201).json(newUser);
});

// PUT api/users/{userId}
app.put('/api/users/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!isValidUUID(userId)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }

  const { username, age, hobbies } = req.body;

  const user = db[userId];
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.username = username || user.username;
  user.age = age || user.age;
  user.hobbies = hobbies || user.hobbies;

  res.status(200).json(user);
});

// DELETE api/users/{userId}
app.delete('/api/users/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!isValidUUID(userId)) {
    res.status(400).json({ message: 'Invalid userId' });
    return;
  }

  const user = db[userId];
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  delete db[userId];

  res.sendStatus(204);
});

// Handle non-existing endpoints
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Handle errors
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Helper function to validate UUID
function isValidUUID(uuid: string): boolean {
  const uuidPattern =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidPattern.test(uuid);

}
