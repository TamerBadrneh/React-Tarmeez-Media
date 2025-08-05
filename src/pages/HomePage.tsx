// Chakra UI
import {
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

// Other Libraries
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

// React
import { useEffect, useState } from "react";

// Icons
import { CgProfile } from "react-icons/cg";
import { IoLogIn } from "react-icons/io5";
import { TiHome } from "react-icons/ti";

// Types
import type { Post } from "@/Types/Interfaces/Post.type";
import { PostComponent } from "@/components/ui/PostComponent";

export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  async function fetchPosts() {
    const response = await axios.get(
      `https://tarmeezacademy.com/api/v1/posts?limit=15&page=${currentPage}`
    );
    setCurrentPage(currentPage + 1);
    setLastPage(response.data.meta.last_page);
    setPosts([...posts, ...response.data.data]);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {/* Nav-bar */}
      <HStack justifyContent="space-between" margin="15px">
        <HStack gap="10px" flex="1">
          <Image src="/assets/images/Application-logo.png" width="23px" />
          <Heading size="sm">Tarmeez Media</Heading>
        </HStack>
        <HStack>
          <IconButton size="md" variant="ghost" rounded="full">
            <TiHome />
          </IconButton>
          <IconButton size="md" variant="ghost" rounded="full">
            <CgProfile />
          </IconButton>
          <IconButton size="md" variant="ghost" rounded="full">
            <IoLogIn />
          </IconButton>
        </HStack>
      </HStack>

      <Container>
        <VStack gap="20px" align="stretch">
          {/* Header - Home */}
          <Heading size="xl" alignSelf="start">
            Welcome Guest
          </Heading>

          {/* Post-List */}
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPosts}
            hasMore={currentPage < lastPage}
            loader={
              <VStack py={4}>
                <Spinner size="xl" />
              </VStack>
            }
            endMessage={
              <Text textAlign="center" py={4}>
                No more posts
              </Text>
            }
          >
            <VStack gap="30px" align="stretch" mt={4}>
              {posts.map((post: Post) => (
                <PostComponent key={post.id} post={post} />
              ))}
            </VStack>
          </InfiniteScroll>
        </VStack>
      </Container>
    </>
  );
};
