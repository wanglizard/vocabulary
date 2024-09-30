import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="header">
            <h1>
                <Link to="/">IT用語単語帳</Link>
            </h1>
            <div className="menu">
                <Link to="/create_word" className="link">
                    単語追加
                </Link>
                <Link to="/create_day" className="link">
                    日付追加
                </Link>
            </div>
        </div>
    );
}