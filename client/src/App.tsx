import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import { AppProvider } from "./lib/context";

import Home from "@/pages/home";
import Shop from "@/pages/shop";
import Product from "@/pages/product";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Dashboard from "@/pages/admin/dashboard";
import Products from "@/pages/admin/products";
import AddProduct from "@/pages/admin/add-product";
import EditProduct from "@/pages/admin/edit-product";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/shop/:category" component={Shop} />
      <Route path="/product/:slug" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/products" component={Products} />
      <Route path="/admin/products/add" component={AddProduct} />
      <Route path="/admin/products/edit/:id" component={EditProduct} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router />
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
