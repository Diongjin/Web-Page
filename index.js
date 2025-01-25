const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/sports-rental', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB 연결 성공"))
  .catch(err => console.log("MongoDB 연결 실패:", err));

// 사용자 모델 정의
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// 용품 모델 정의
const ItemSchema = new mongoose.Schema({
  name: String,
  userId: mongoose.Schema.Types.ObjectId, // 용품과 사용자 연결
});

const Item = mongoose.model('Item', ItemSchema);

// 회원가입 API
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  await newUser.save();
  res.json({ message: '회원가입 성공' });
});

// 로그인 API
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: '잘못된 비밀번호입니다.' });

  const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  res.json({ message: '로그인 성공', token });
});

// 용품 등록 API
app.post('/add-item', async (req, res) => {
  const { token, itemName } = req.body;

  try {
    const decoded = jwt.verify(token, 'secretkey');
    const newItem = new Item({ name: itemName, userId: decoded.userId });
    await newItem.save();
    res.json({ message: '용품 등록 성공' });
  } catch (err) {
    res.status(401).json({ message: '인증 실패' });
  }
});

// 용품 목록 조회 API
app.get('/items', async (req, res) => {
  const items = await Item.find().populate('userId', 'username');
  res.json(items);
});

app.listen(5000, () => {
  console.log('서버가 5000번 포트에서 실행 중');
});
