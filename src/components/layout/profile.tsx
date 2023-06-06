import authOptions from "@/lib/auth";
import { PersonIcon } from "@/lib/icons";
import { getServerSession } from "next-auth";
import Link from "next/link";
import GoogleSignInButton from "../ui/googleSignInButton";

export default async function Profile() {
  const session = await getServerSession(authOptions);
  let initials: JSX.Element | string = <PersonIcon className="text-2xl" />;

  if (session && session.user && session.user.name) {
    const userNames = session.user.name.split(" ");
    const first = userNames[0] ? userNames[0][0] : "";
    const last = userNames[1] ? userNames[1][0] : "";
    initials = first + last;
  }

  const loggedIn = Boolean(session?.user);

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-circle btn-sm"
      >
        <div className="rounded-full avatar flex justify-center items-center">
          <p>{initials}</p>
        </div>
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li className={!loggedIn ? "disabled cursor-not-allowed" : ""}>
          {loggedIn ? <Link href="/dashboard">panel</Link> : <div>panel</div>}
        </li>
        <li className={!loggedIn ? "disabled cursor-not-allowed" : ""}>
          {loggedIn ? <Link href="/profile">profil</Link> : <div>profil</div>}
        </li>
        <li>
          <GoogleSignInButton isLoggedIn={loggedIn} />
        </li>
      </ul>
    </div>
  );
}
