// import Nav from '@common/Nav';
// import Footer from "@components/Footer";
import TabNav from '../common/TabNav';


export default function MainLayout({ children }) {
  return (
    <>
      <div className='flex flex-col h-screen justify-between pb-18'>


        {/* <Nav /> */}

        <main>
          <div className="px-2 min-h-screen pb-20">{children}</div>
        </main>

        {/* <Footer /> */}

        {/* <TabNav /> */}
      </div>
    </>
  );
}
