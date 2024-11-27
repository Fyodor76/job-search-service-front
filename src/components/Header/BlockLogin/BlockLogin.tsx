import BlockLoginServer from "../BlockLoginServer/BlockLoginServer";
import BlockLoginClient from "../BlockLoginClient/BlockLoginClient";
import { checkAuth } from "@/helpers/checkAuth";
import block from "bem-cn-lite";

const b = block("header");

const BlockLogin: React.FC<{screen: string}> = async ({screen}) => {
  const { isAuth } = await checkAuth();

  return (
    <div className={b("block_login")}>
      <BlockLoginServer isAuth={isAuth} />
      <BlockLoginClient isAuth={isAuth} screen={screen}/>
    </div>
  );
};

export default BlockLogin;
