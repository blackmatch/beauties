import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';
import md from './models/girls';
import rt from './router';
// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(md);

// 4. Router
app.router(rt);

// 5. Start
app.start('#root');
