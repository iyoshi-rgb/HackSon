export default function Headar() {
  return (
    <div className="navbar bg-white border-b border-brack-500">
      <a href="roomlist" className="btn btn-ghost text-xl">
        募集
      </a>
      <a href="/makeroom" className="btn btn-ghost text-xl">
        募集作成
      </a>
      <a href="/chat" className="btn btn-ghost text-xl">
        DM
      </a>
    </div>
  );
}
