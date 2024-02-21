'use client';

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import walletSummary from '../src/data/walletSummary.json';
import { useState } from 'react';

interface Date {
  month: { [key: string]: number };
  week: { [key: string]: number };
  year: { [key: string]: number };
}

interface WalletSummary {
  totalBuySellTimes: Date,
  totalBuyAmounts: Date,
  totalSellAmounts: Date
}



export default function Home() {
  const [sortBy, setSortBy] = useState<'month' | 'week' | 'year'>('month')

  const converteWallet = (): any[] => {
    const summary: WalletSummary = walletSummary;
    const totalBuySellTimes: Date = summary.totalBuySellTimes
    const totalBuyAmounts: Date = summary.totalBuyAmounts
    const totalSellAmounts: Date = summary.totalSellAmounts

    return Object.keys(totalBuySellTimes[sortBy]).map((item: string, index) => {
      return {
        name: index,
        totalBuyAmounts: totalBuyAmounts[sortBy][item],
        totalSellAmounts: totalSellAmounts[sortBy][item],
        totalBuySellTimes: totalBuySellTimes[sortBy][item],
      }
    })
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:px-8 xl:px-10 py-44 bg-slate-950">
      <div className="flex flex-col items-start gap-10 justify-center p-7 pt-10 border border-slate-900 bg-slate-900/50 rounded-xl w-full max-w-4xl h-[500px]">
        <select name="sortBy" className='bg-slate-950 border border-gray-300 rounded-md' onChange={e => setSortBy(e.target.value as 'month' | 'week' | 'year')} >
          <option value="month">month</option>
          <option value="week">week</option>
          <option value="year">year</option>
        </select>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart width={500} height={500} data={converteWallet()} >
            <CartesianGrid stroke="#e4e4e4b4" strokeDasharray="5 5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" dataKey="totalBuySellTimes" />
            <Tooltip />
            <Legend />

            <Bar stackId="a" dataKey="totalBuyAmounts" yAxisId="left" barSize={20}>
              {
                converteWallet().map((entry, index) => (
                  <Cell
                    fill={converteWallet()[index].totalBuyAmounts > converteWallet()[index].totalSellAmounts ? '#3ea065' : '#b31328'} />
                ))
              }
            </Bar>


            <Bar dataKey="totalSellAmounts" yAxisId="left" stackId="a" fill="#454d8b" barSize={20} />
            <Line yAxisId="right" type="monotone" dataKey="totalBuySellTimes" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}



