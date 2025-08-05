// Chakra UI
import {
  Avatar,
  Badge,
  Card,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

// Types
import type { Post, Tag } from "@/Types/Interfaces/Post.type";

export const PostComponent = ({ post }: { post: Post }) => {
  return (
    <Card.Root width="full">
      <Card.Body>
        {/* Card Heading */}
        <HStack mb="6" gap="3">
          {/* User-Image */}
          <Avatar.Root>
            <Avatar.Image src={post.author.profile_image ?? undefined} />
            <Avatar.Fallback name={post.author.name} />
          </Avatar.Root>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              @{post.author.username}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {post.created_at}
            </Text>
          </Stack>
        </HStack>

        {/* Post-Content */}
        <VStack gap="10px" alignItems="start">
          <Image
            width="100%"
            height="auto"
            maxHeight="500px"
            minHeight="300px"
            objectFit="cover"
            borderRadius="8px"
            src={post.image}
            onError={(event) => (event.currentTarget.style.display = "none")}
          />
          {post.title && <Heading size="md">{post.title}</Heading>}
          {post.body && (
            <Text fontSize="sm" color="fg.muted">
              {post.body}
            </Text>
          )}
          {/* Tags */}
          {post.tags.length > 0 && (
            <HStack>
              {post.tags.map((tag: Tag) => (
                <Badge key={Date.now()}>{tag.name}</Badge>
              ))}
            </HStack>
          )}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
