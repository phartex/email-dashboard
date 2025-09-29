import { post } from "@/app/api/config/api-client/habari-admin";
import { emailServiceUrls } from "@/constants/apiURls/email";

import { v4 as uuidv4 } from "uuid";


export type FakeEmail = {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  labels: string[];
};


const sampleEmails: FakeEmail[] = [
  {
    id: uuidv4(),
    from: "john.doe@example.com",
    to: "you@example.com",
    subject: "Meeting Reminder",
    body: "Don't forget we have a meeting tomorrow at 10am.",
    date: new Date().toISOString(),
    read: false,
    starred: false,
    labels: ["work"],
  },
  {
    id: uuidv4(),
    from: "newsletter@techupdates.com",
    to: "you@example.com",
    subject: "Top 10 JavaScript Trends 2025",
    body: "Check out the latest JavaScript trends this year...",
    date: new Date(Date.now() - 86400000).toISOString(), // yesterday
    read: true,
    starred: true,
    labels: ["personal"],
  },
  {
    id: uuidv4(),
    from: "support@shop.com",
    to: "you@example.com",
    subject: "Your order has been shipped",
    body: "Good news! Your package is on the way 🚚",
    date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    read: false,
    starred: false,
    labels: [],
  },
];

export const HabariSuperAdminService = {

    register: async (payload: any): Promise<any> => {
        try {

            const response = await post(`${emailServiceUrls.register}`,  payload );
            return response;

           
        } catch (error) {
            console.error("registration failed:", error);
            throw error;
        }
    },
    login: async (payload: any): Promise<any> => {
        try {

            const response = await post(`${emailServiceUrls.login}`, payload );
            return response;

           
        } catch (error) {
            console.error("login failed:", error);
            throw error;
        }
    },

    getAll: async (): Promise<FakeEmail[]> => {
    return Promise.resolve(sampleEmails);
  },addLabel: async (id: string, label: string): Promise<FakeEmail | null> => {
    const email = sampleEmails.find((e) => e.id === id);
    if (!email) return null;
    if (!email.labels.includes(label)) {
      email.labels.push(label);
    }
    return Promise.resolve(email);
  },

  toggleStar: async (id: string): Promise<FakeEmail | null> => {
    const email = sampleEmails.find((e) => e.id === id);
    if (!email) return null;
    email.starred = !email.starred;
    return Promise.resolve(email);
  },

  markAsRead: async (id: string): Promise<FakeEmail | null> => {
    const email = sampleEmails.find((e) => e.id === id);
    if (!email) return null;
    email.read = true;
    return Promise.resolve(email);
  },



}