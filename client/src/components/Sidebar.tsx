import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '../App';

const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className='w-1/5 max-w-52 shadow-lg pt-3 hidden md:block'>
      {sidebar.map((item) => {
        return (
          <div key={item.path} className='p-1.5'>
            <Link
              className={`w-full block ${
                pathname === item.path ? 'bg-secondary-100' : ''
              } hover:bg-secondary-200 px-2 py-1 rounded-lg`}
              to={item.path}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
