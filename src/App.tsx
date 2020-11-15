import * as React from "react";
import { v4 } from "uuid";
import "./styles.scss";
import defaultTodos from "./todos";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/**
 * (기본적으로 keep 의 card 들을 상상)
 * 중요도로 box의 크기를, 급함으로 box의 위치를
 * 우선순위별로 무조건 처리하지 않는 사람의 불완전함을 수용
 * 상단에는 equalizer 처럼 ? 보이는 progress bar로 하루를 나타냄
 * 업무량으로는 색의 농도를 나타낸다.
 * 다음날로 넘어갈수가 있기 때문에..
 * 하루의 남은 시간이 예상 업무량만큼에 가깝게 줄어들면 box들이 이동한다.? live switch를 켠다면..
 *
 * 제주 카드 내부에는 여러 또다른 카드들이 존재할 수도 있게 재귀구조로
 * 최대 1단까지만
 */

/**
 * 나중에는 월별 Todo, 주별 todo, 일별 todo 등도 나누면 좋을듯
 * daily todo 일기 쓰기 같은거 보면서 든 생각
 */

interface INTodoCard {
  priority: number;
  urgency: number;
  weight: number;
  color?: string;
  content: any;
  done: boolean;
}

const NTodoCard = ({
  priority,
  urgency,
  weight,
  color,
  content,
  done
}: INTodoCard) => {
  return (
    <>
      <div
        className={`todo-card priority-${priority} urgency-${urgency} weight-${weight} color-${color} ${
          done ? "done" : ""
        }`}
      >
        <div
          className={`todo-card-background weight-${weight} color-${color}`}
        ></div>
        {done || <span className="check-todo">TODO</span>}
        {content}
      </div>
    </>
  );
};

export default function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  // const [doing, setDoing] = React.useState([]); // 일단 doing은 제외
  const [dones, setDones] = React.useState([]);

  // console.log(v4().trim());

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/login">login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <h1>Next TODO</h1>
            <h2>Manage Your Tasks Wisely</h2>
            <div
              style={{ margin: "5px 0px", borderBottom: "1px solid black" }}
            ></div>
            <section className="container">
              {todos
                .sort((todoA, todoB) => {
                  if (todoA.done && todoB.done)
                    return todoB.urgency - todoA.urgency;
                  if (todoA.done || todoB.done) return todoA.done ? 1 : -1;

                  return todoB.urgency - todoA.urgency;
                })
                .map((todo) => {
                  return <NTodoCard {...todo} />;
                })}
            </section>
          </Route>
          <Route path="/login">
            <div>login</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
