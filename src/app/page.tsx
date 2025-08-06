"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Menu,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Ellipsis,
  LayoutGrid,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { CaretIcon } from "@/components/caret-icon";

// Sample transaction data
const transactions = [
  {
    id: 1,
    date: "2023-10-01",
    remark: "Salary",
    amount: 3000,
    currency: "USD",
    type: "Credit",
  },
  {
    id: 2,
    date: "2023-10-02",
    remark: "Groceries",
    amount: -150,
    currency: "USD",
    type: "Debit",
  },
  {
    id: 3,
    date: "2023-10-03",
    remark: "Gym Membership",
    amount: -50,
    currency: "USD",
    type: "Debit",
  },
  {
    id: 4,
    date: "2023-10-04",
    remark: "Dinner",
    amount: -40,
    currency: "USD",
    type: "Debit",
  },
  {
    id: 5,
    date: "2023-10-05",
    remark: "Movie Tickets",
    amount: -30,
    currency: "USD",
    type: "Debit",
  },
  {
    id: 6,
    date: "2023-10-06",
    remark: "Rent",
    amount: -1200,
    currency: "USD",
    type: "Debit",
  },
  {
    id: 7,
    date: "2023-10-07",
    remark: "Utilities",
    amount: -100,
    currency: "USD",
    type: "Debit",
  },
  {
    id: 8,
    date: "2023-10-08",
    remark: "Car Payment",
    amount: -400,
    currency: "USD",
    type: "Debit",
  },
  {
    id: 9,
    date: "2023-10-09",
    remark: "Insurance",
    amount: -200,
    currency: "USD",
    type: "Debit",
  },
];

const summaryCards = [
  {
    title: "Total Balance",
    amount: "$12,345",
    change: "+5%",
    trend: "up",
  },
  {
    title: "Total Credits",
    amount: "$7,890",
    change: "+3%",
    trend: "up",
  },
  {
    title: "Total Debits",
    amount: "$4,455",
    change: "-2%",
    trend: "down",
  },
  {
    title: "Transactions",
    amount: "150",
    change: "+10%",
    trend: "up",
  },
];

const teamMembers = [
  { name: "Ava", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Liam", avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Noah", avatar: "/placeholder.svg?height=32&width=32" },
];

export default function WalletLedgerDashboard() {
  const [sortColumn, setSortColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState("overview");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue = a[sortColumn as keyof typeof a];
    let bValue = b[sortColumn as keyof typeof b];

    if (sortColumn === "amount") {
      aValue = Math.abs(Number(aValue));
      bValue = Math.abs(Number(bValue));
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Image
                src="/finlogo.png"
                alt="logo"
                width={100}
                height={100}
                draggable={false}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:block w-84 bg-white min-h-screen"
        >
          <nav className="p-4 space-y-2">
            <Button
              variant="secondary"
              className="w-full justify-start rounded-full bg-[#38677616] text-[#3A6C7B]"
            >
              Dashboard
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Transactions
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Reports
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {/* Page Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl font-semibold">Wallet Ledger</h1>
                <CaretIcon width={24} height={24} />
                <Badge
                  variant="secondary"
                  className="bg-gray-200 rounded-full px-2 py-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Active
                </Badge>
                <div className="flex items-center gap-2 ml-auto">
                  <Button className="rounded-full bg-[#4B8B9F] text-white">
                    Share
                  </Button>
                  <Button className="rounded-full" variant="ghost">
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Team Members */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {teamMembers.map((member, index) => (
                    <Avatar key={index} className="border-2 border-white">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                    +12
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  Ava, Liam, Noah +12 others
                </span>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mb-6 w-full"
            >
              <div className="flex items-center w-full border-b-2 border-black/10">
                <TabsList className="bg-transparent">
                  <TabsTrigger value="overview" className="bg-transparent">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="bg-transparent">
                    Transactions
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                {/* Summary Cards */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {summaryCards.map((card, index) => (
                      <motion.div
                        key={card.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ y: -2 }}
                      >
                        <Card className="bg-[#EAEFF0] border-none shadow-none rounded-[20px]">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                              {card.title}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                            >
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {card.amount}
                            </div>
                            <div
                              className={`text-xs flex items-center gap-1 ${
                                card.trend === "up"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {card.trend === "up" ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {card.change}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Transactions Table */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div
                            onClick={() => handleSort("date")}
                            className="h-auto p-0 font-medium flex items-center group cursor-pointer"
                          >
                            Date
                            <CaretIcon
                              width={24}
                              height={24}
                              className={`group-hover:ml-1 transition-all duration-300 ${
                                sortDirection === "asc" && sortColumn === "date"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div
                            onClick={() => handleSort("remark")}
                            className="h-auto p-0 font-medium flex items-center group cursor-pointer"
                          >
                            Remark
                            <CaretIcon
                              width={24}
                              height={24}
                              className={`group-hover:ml-1 transition-all duration-300 ${
                                sortDirection === "asc" &&
                                sortColumn === "remark"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div
                            onClick={() => {
                              handleSort("amount");
                            }}
                            className="h-auto p-0 font-medium flex items-center group cursor-pointer"
                          >
                            Amount
                            <CaretIcon
                              width={24}
                              height={24}
                              className={`group-hover:ml-1 transition-all duration-300 ${
                                sortDirection === "asc" &&
                                sortColumn === "amount"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div
                            onClick={() => {
                              handleSort("currency");
                            }}
                            className="h-auto p-0 font-medium flex items-center group cursor-pointer"
                          >
                            Currency
                            <CaretIcon
                              width={24}
                              height={24}
                              className={`group-hover:ml-1 transition-all duration-300 ${
                                sortDirection === "asc" &&
                                sortColumn === "currency"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>
                        </TableHead>
                        <TableHead>
                          <div
                            onClick={() => {
                              handleSort("type");
                            }}
                            className="h-auto p-0 font-medium flex items-center group cursor-pointer"
                          >
                            Type
                            <CaretIcon
                              width={24}
                              height={24}
                              className={`group-hover:ml-1 transition-all duration-300 ${
                                sortDirection === "asc" && sortColumn === "type"
                                  ? "rotate-180"
                                  : ""
                              }`}
                            />
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedTransactions.map((transaction, index) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * index }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.remark}</TableCell>
                          <TableCell
                            className={`font-medium ${
                              transaction.amount > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.amount > 0 ? "$" : "-$"}
                            {Math.abs(transaction.amount).toLocaleString()}
                          </TableCell>
                          <TableCell>{transaction.currency}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 bg-gray-200 rounded-full px-2 py-1 w-fit">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  transaction.type === "Credit"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <span
                                className={
                                  transaction.type === "Credit"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {transaction.type}
                              </span>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </motion.div>
              </TabsContent>

              <TabsContent value="transactions">
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    Transactions view coming soon...
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
