import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user) return null;

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={14}
        replies={3}
        postImg="/post1.jpeg"
        postTitle="Hey guys! I live here"
      />
      <UserPost
        likes={20}
        replies={19}
        postImg="/post2.png"
        postTitle="Leet code"
      />
      <UserPost
        likes={50}
        replies={13}
        postImg="/post3.png"
        postTitle="e ling musk"
      />
    </>
  );
};

export default UserPage;
