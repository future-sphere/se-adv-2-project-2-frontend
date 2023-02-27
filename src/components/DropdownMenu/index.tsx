import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from '@heroicons/react/20/solid';
import { classNames } from '../../helpers';

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
}

export const DropdownMenu = ({ menuItems, onSelect }: DropdownMenuProps) => {
  return (
    <Menu as='div' className='relative inline-block text-left'>
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
                        'group flex items-center px-4 py-2 text-sm'
                      )}
                    >
                      <PencilSquareIcon
                        className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                      {subItem.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        ))}
        {/* <Menu.Items className='absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <PencilSquareIcon
                    className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Edit
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <DocumentDuplicateIcon
                    className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Duplicate
                </a>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArchiveBoxIcon
                    className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Archive
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <ArrowRightCircleIcon
                    className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Move
                </a>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <UserPlusIcon
                    className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Share
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HeartIcon
                    className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Add to favorites
                </a>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <TrashIcon
                    className='w-5 h-5 mr-3 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                  Delete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items> */}
      </Transition>
    </Menu>
  );
};
