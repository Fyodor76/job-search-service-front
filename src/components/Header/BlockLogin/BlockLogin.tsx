import BlockLoginServer from "../BlockLoginServer/BlockLoginServer";
import BlockLoginClient from "../BlockLoginClient/BlockLoginClient";
import { checkAuth } from "@/helpers/checkAuth";
import block from "bem-cn-lite";
import { emojiList } from "@/const/emojiList";
import { AuthData } from "@/types/AuthUserData";

const b = block("header");

const BlockLogin: React.FC<{ screen: string }> = async ({ screen }) => {
  const { isAuth, authData } = await checkAuth();
  const randomIndexPicture = Math.floor(Math.random() * emojiList.length);

  return (
    <div className={b("block_login")}>
      <BlockLoginServer
        isAuth={isAuth}
        randomIndexPicture={randomIndexPicture}
      />
      <BlockLoginClient
        isAuth={isAuth}
        screen={screen}
        randomIndexPicture={randomIndexPicture}
        authData={authData as unknown as AuthData}
      />
    </div>
  );
};

export default BlockLogin;
