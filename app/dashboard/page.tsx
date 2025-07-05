import { connectToDB } from '@/lib/db';
import { Subscriber } from '@/lib/models/Subscriber';

export const dynamic = "force-dynamic"; // Ensure fresh data on each visit

type SubscriberType = {
  _id: string;
  email: string;
  subscribedAt: string;
};

export default async function Dashboard() {
  await connectToDB();
  const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Newsletter Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-900 rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscribed At
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub: SubscriberType) => (
              <tr key={sub._id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 text-sm">{sub.email}</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(sub.subscribedAt).toLocaleString()}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
