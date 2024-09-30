import {useState} from "react";

interface IProps {
    word: IWord;
}

export interface IWord {
    id: number;
    day: string;
    jp: string;
    yomigana: string;
    kor: string;
    isDone: boolean;
}

export default function Word({word: w}: IProps) {
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);

    function toggleShow() {
        setIsShow(!isShow);
    }

    function toggleDone() {
        fetch(`http://localhost:3001/words/${word.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...word,
                isDone: !isDone,
            }),
        }).then(res => {
            if (res.ok) {
                setIsDone(!isDone);
            }
        });
    }

    function del() {
        if (window.confirm("削除しますか？")) {
            fetch(`http://localhost:3001/words/${word.id}`, {
                method: "DELETE",
            }).then(res => {
                if (res.ok) {
                    setWord({
                        ...word,
                        id: 0
                    });
                }
            });
        }
    }

    if (word.id === 0) {
        return null;
    }

    return (
        <tr className={isDone ? "off" : ""}>
            <td>
                <input type="checkbox" checked={isDone} onChange={toggleDone}/>
            </td>
            <td>{word.jp}</td>
            <td>{isShow && word.yomigana}</td>
            <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}>よみがな {isShow ? "隠す" : "見る"}</button>
                <button onClick={del} className="btn_del">
                    削除
                </button>
            </td>
        </tr>
    );
}

// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE