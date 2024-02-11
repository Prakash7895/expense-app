import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '../App';

const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className='w-1/5 max-w-52 shadow-medium bg-background pt-3 hidden md:block'>
      {sidebar.map((item) => {
        return (
          <div key={item.path} className='p-1.5'>
            <Link
              className={`w-full block ${
                pathname === item.path
                  ? 'bg-primary-500 text-foreground-50'
                  : 'hover:bg-primary-600 hover:text-foreground-50'
              } px-2 py-1 rounded-lg`}
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
