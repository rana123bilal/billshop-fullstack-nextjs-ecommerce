import { Button } from "antd";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to Bill&apos;s Shop!</h1>
      <div className="flex gap-4">
        <Button type="primary">Antd Primary Button</Button>
        <Button type="default">Antd Default button</Button>
      </div>

    </div>
  );
}
