"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

// Define the context type
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userDetails: userDetails | null;
  setUserDetails: React.Dispatch<React.SetStateAction<userDetails | null>>;
}

interface userDetails {
  name: string;
  email: string;
  age: number;
  goal: string;
  fitness_level: string;
  days_per_week: number;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define props type for provider
interface UserProviderProps {
  children: ReactNode;
}

// Create the provider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<userDetails | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      }

      // Listen to auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
    };

    loadUser();
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user?.email);
      if (error) {
        console.error("Error fetching user details:", error.message);
      } else {
        setUserDetails(data[0]);
        // console.log(data);
      }
    }

    console.log(userDetails);

    fetchUserData();
    // console.log(user?.email)
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, userDetails, setUserDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
