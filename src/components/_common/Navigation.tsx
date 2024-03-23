import { NavLink } from "react-router-dom";

const MENU: { path: string; title: string }[] = [
  {
    path: "/",
    title: "홈",
  },
  {
    path: "/qna",
    title: "질문게시판",
  },
  {
    path: "/free",
    title: "자유게시판",
  },
];

const Navigation: React.FC = () => {
  return (
    <header className="w-full mx-auto px-8 py-8 flex justify-between border-solid border-b-2 border-gray-800">
      <nav className="w-screen">
        <ul className="flex gap-4">
          {MENU.map((item, index) => {
            return (
              <li key={index} className="flex-1 text-center">
                <NavLink to={item.path} className={"text-gray-800 hover:text-gray-400"} end>
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
