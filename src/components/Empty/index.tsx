export interface Prop {
  title: string;
  description: string;
  icon: any;
}

export const Empty = ({ title, description, icon }: Prop) => {
  return (
    <div className='flex flex-col items-center mx-auto text-center'>
      {icon}
      <h3 className='mt-2 text-sm font-medium text-gray-900'>{title}</h3>
      <p className='mt-1 text-sm text-gray-500'>{description}</p>
    </div>
  );
};
