import { getDashboardLayout } from "@/components/layout";
import { ViewPosts } from "@/feature/post";

export default function Page() {
  return <ViewPosts />;
}

Page.getLayout = getDashboardLayout;
