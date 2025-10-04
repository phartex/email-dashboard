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
    date: new Date(Date.now() - 86400000).toISOString(),
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
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    read: false,
    starred: false,
    labels: [],
  },
  {
    id: uuidv4(),
    from: "hr@company.com",
    to: "you@example.com",
    subject: "Job Interview Invitation",
    body: "We are pleased to invite you for an interview scheduled on Thursday at 2pm.",
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    read: false,
    starred: true,
    labels: ["work"],
  },
  {
    id: uuidv4(),
    from: "friend.mary@example.com",
    to: "you@example.com",
    subject: "Weekend Plans",
    body: "Hey! Are we still going hiking this weekend?",
    date: new Date(Date.now() - 4 * 86400000).toISOString(),
    read: true,
    starred: false,
    labels: ["personal"],
  },
  {
    id: uuidv4(),
    from: "no-reply@bankalerts.com",
    to: "you@example.com",
    subject: "Debit Alert: ₦25,000.00",
    body: "A debit transaction of ₦25,000.00 occurred on your account ending with 2345.",
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    read: false,
    starred: false,
    labels: ["finance"],
  },
  {
    id: uuidv4(),
    from: "promo@travelworld.com",
    to: "you@example.com",
    subject: "Flash Sale! 50% Off Flights ✈️",
    body: "Book your next trip with 50% off flights to any destination. Offer ends soon!",
    date: new Date(Date.now() - 6 * 86400000).toISOString(),
    read: true,
    starred: false,
    labels: ["promotions"],
  },
  {
    id: uuidv4(),
    from: "ceo@startup.com",
    to: "you@example.com",
    subject: "Welcome to the Team!",
    body: "We’re excited to have you on board. Let’s build something great together 💪",
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
    read: true,
    starred: true,
    labels: ["work"],
  },
  {
    id: uuidv4(),
    from: "events@musicfest.com",
    to: "you@example.com",
    subject: "Your Ticket Confirmation - AfroBeats Fest 2025",
    body: "Your ticket purchase was successful! See you at the event 🎶",
    date: new Date(Date.now() - 8 * 86400000).toISOString(),
    read: false,
    starred: false,
    labels: ["personal", "events"],
  },
  {
    id: uuidv4(),
    from: "security@accounts.com",
    to: "you@example.com",
    subject: "Unusual Login Attempt Detected",
    body: "We noticed a login attempt from an unrecognized device. If this wasn’t you, please reset your password immediately.",
    date: new Date(Date.now() - 9 * 86400000).toISOString(),
    read: false,
    starred: true,
    labels: ["security"],
  },
  {
    id: uuidv4(),
    from: "project.manager@example.com",
    to: "you@example.com",
    subject: "Sprint 12 Updates",
    body: "Please review the sprint board before tomorrow’s standup. We’ll discuss blockers and next priorities.",
    date: new Date(Date.now() - 10 * 86400000).toISOString(),
    read: true,
    starred: false,
    labels: ["work"],
  },
  {
    id: uuidv4(),
    from: "offers@fooddelivery.com",
    to: "you@example.com",
    subject: "Get 30% Off Your Next Order 🍕",
    body: "Craving something delicious? Use code EATWELL30 to save 30% on your next order.",
    date: new Date(Date.now() - 11 * 86400000).toISOString(),
    read: false,
    starred: false,
    labels: ["promotions"],
  },
  {
    id: uuidv4(),
    from: "university@admissions.edu",
    to: "you@example.com",
    subject: "Application Received - Thank You!",
    body: "We have received your application. Our admissions team will contact you soon regarding the next steps.",
    date: new Date(Date.now() - 12 * 86400000).toISOString(),
    read: true,
    starred: false,
    labels: ["education"],
  },
  {
    id: uuidv4(),
    from: "customer.care@telecoms.ng",
    to: "you@example.com",
    subject: "Your Data Plan Renewal",
    body: "Your monthly data plan has been successfully renewed. Enjoy seamless browsing!",
    date: new Date(Date.now() - 13 * 86400000).toISOString(),
    read: false,
    starred: false,
    labels: ["finance"],
  },
  {
    id: uuidv4(),
    from: "reminder@calendarapp.com",
    to: "you@example.com",
    subject: "Doctor’s Appointment Tomorrow 🩺",
    body: "Just a reminder: You have an appointment scheduled for tomorrow at 2:30 PM.",
    date: new Date(Date.now() - 14 * 86400000).toISOString(),
    read: true,
    starred: false,
    labels: ["reminders", "personal"],
  },
];

export const HabariSuperAdminService = {

  register: async (payload: any): Promise<any> => {
    try {

      const response = await post(`${emailServiceUrls.register}`, payload);
      return response;


    } catch (error) {
      console.error("registration failed:", error);
      throw error;
    }
  },
  login: async (payload: any): Promise<any> => {
    try {

      const response = await post(`${emailServiceUrls.login}`, payload);
      return response;


    } catch (error) {
      console.error("login failed:", error);
      throw error;
    }
  },

  getAllEmails: async (): Promise<FakeEmail[]> => {
    return Promise.resolve(sampleEmails);
  }, addLabel: async (id: string, label: string): Promise<FakeEmail | null> => {
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