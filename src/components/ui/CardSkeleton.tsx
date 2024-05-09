import { SkeletonText } from "@chakra-ui/react";
import Card from "../dashboard/Card";

export default function NotificationSkeleton() {
  return (
    <Card w={"100%"} bg="transparent">
      <SkeletonText
        m="2"
        noOfLines={3}
        spacing="4"
        skeletonHeight="2"
        height="80px"
        startColor="gray.200"
        endColor="gray.400"
        w="400px"
      />
    </Card>
  );
}
