import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import React from "react";

const PageBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (location.pathname === "/") return null;

  // Map for converting route names to more user-friendly displays
  const routeNameMap = {
    landing: "Home",
    competitions: "Competitions",
    riders: "Riders Group",
    trekking: "Trekking/Exploration",
    shop: "Shop",
    contact: "Contact Us",
    products: "Products",
    product: "Product Details",
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
      <Breadcrumb className="py-3 px-6 md:px-10 container mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link
              to="/landing"
              className="inline-flex items-center gap-1.5 text-orca-600 hover:text-orca-800 transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Home
            </Link>
          </BreadcrumbItem>

          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const displayName =
              routeNameMap[name] ||
              name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <React.Fragment key={name}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="font-medium">
                      {displayName}
                    </BreadcrumbPage>
                  ) : (
                    <Link
                      to={routeTo}
                      className="text-orca-600 hover:text-orca-800 transition-colors"
                    >
                      {displayName}
                    </Link>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumbs;
