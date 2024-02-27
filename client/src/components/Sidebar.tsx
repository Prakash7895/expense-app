import { Link, useLocation } from 'react-router-dom';
import { sidebar } from '../App';
import { useSelector } from 'react-redux';
import { getSettings, setShowSidebar } from '../utils/store/settingSlice';
import { useAppDispatch } from '../utils/types';

const Sidebar = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { showSidebar } = useSelector(getSettings);

  return (
    <div
      className={`max-w-52 shadow-medium bg-background pt-3 z-[250] top-0 bottom-0 md:w-1/5 overflow-hidden absolute md:relative transition-all ${
        showSidebar ? 'w-64' : 'w-0'
      }`}
    >
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
              onClick={() => dispatch(setShowSidebar(false))}
              onMouseOver={item.onMouseOver}
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
