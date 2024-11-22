import BlockLoginServer from "../BlockLoginServer/BlockLoginServer";
import BlockLoginClient from "../BlockLoginClient/BlockLoginClient";
import { checkAuth } from "@/helpers/checkAuth";
import block from "bem-cn-lite";

const b = block("header");

const BlockLogin: React.FC = async () => {
  const { isAuth } = await checkAuth();

  return (
    <div className={b("block_login")}>
      <BlockLoginServer isAuth={isAuth} />

      <BlockLoginClient isAuth={isAuth} />
    </div>
  );
};

export default BlockLogin;
