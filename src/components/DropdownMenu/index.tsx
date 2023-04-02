import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ArrowTrendingDownIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid';
import { classNames } from '../../helpers';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Sorting } from '../../pages/Subcategory';

interface DropdownMenuItems {
  subMenuItems: {
    icon: JSX.Element;
    label: string;
    field: string;
    order: 'asc' | 'desc';
  }[];
}

interface DropdownMenuProps {
  menuItems: DropdownMenuItems[];
  onSelect: (field: string, order: 'asc' | 'desc') => void;
  value: Sorting[];
}

export const DropdownMenu = ({
  menuItems,
  onSelect,
  value,
}: DropdownMenuProps) => {
  return (
    <Menu as='div' className='relative z-10 inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'>
          Options
          <ChevronDownIcon className='w-5 h-5 ml-2 -mr-1' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        {menuItems.map((item, index) => (
          <Menu.Items
            key={index}
            className='absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
          >
            <div className='py-1'>
              {item.subMenuItems.map((subItem, subIndex) => (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      key={subIndex}
                      onClick={() => onSelect(subItem.field, subItem.order)}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm w-full justify-between'
                      )}
                    >
                      <div className='flex'>
                        {subItem.icon}
                        {subItem.label}
                      </div>
                      {value.find(
                        (v) =>
                          v.field === subItem.field && v.order === subItem.order
                      ) && <CheckIcon className='w-5 h-5 text-green-500' />}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        ))}
      </Transition>
    </Menu>
  );
};
