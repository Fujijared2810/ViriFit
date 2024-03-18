import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
        <UserHeader/>
        <UserPost likes={14} replies={3} postImg="/post1.jpeg" postTitle="Hey guys! I live here" />
        <UserPost likes={20} replies={19} postImg="/post2.png" postTitle="Leet code" />
        <UserPost likes={50} replies={13} postImg="/post3.png" postTitle="e ling musk" />
    </>
  )
}

export default UserPage