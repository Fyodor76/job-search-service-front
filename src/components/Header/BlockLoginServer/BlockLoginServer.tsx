import Button from "@/ui/Button/Button";
import LoginButton from "../LoginButton/LoginButton";
import block from "bem-cn-lite";
import { emojiList } from "@/const/emojiList";

const b = block("header");
interface BlockLoginServerProps {
  isAuth: boolean;
}

const BlockLoginServer: React.FC<BlockLoginServerProps> = ({ isAuth }) => {
  const randomEmoji = isAuth
    ? emojiList[Math.floor(Math.random() * emojiList.length)]
    : null;

  return (
    <div className={b("block_login_server")}>
      {isAuth ? (
        <div className={b("profile-server")}>{randomEmoji}</div>
      ) : (
        <Button size="medium" className={b("login-button")}>
          Войти
        </Button>
      )}
    </div>
  );
};

export default BlockLoginServer;
