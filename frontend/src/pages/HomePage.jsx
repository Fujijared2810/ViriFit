import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
  const [posts, setPost] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);

  const showToast = useShowToast();
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPost([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPost]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow some users to see feed.</h1>
      )}
      {loading && (
        <Flex justify={"center"}>
          <Spinner size="xl" />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
