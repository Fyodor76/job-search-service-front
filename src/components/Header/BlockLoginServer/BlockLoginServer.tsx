import Button from "@/ui/Button/Button";
import block from "bem-cn-lite";
import { emojiList } from "@/const/emojiList";

const b = block("header");
interface BlockLoginServerProps {
  isAuth: boolean;
  randomIndexPicture?: number;
}

const BlockLoginServer: React.FC<BlockLoginServerProps> = ({
  isAuth,
  randomIndexPicture,
}) => {
  const randomEmoji = emojiList[randomIndexPicture || 0];

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
