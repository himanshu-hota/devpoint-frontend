import { useEffect, useState } from "react";
import Blogger from "./Blogger";
import { useGetBloggers } from "../../query/react-query";
import Loading from "../../components/LazyLoader/Loading";
import Error from "../ErrorPage/Error";

const Explore = () => {
  
  const [filteredBloggers, setFilteredBloggers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const { data,isPending,isError,error} = useGetBloggers();

  const bloggers = data?.bloggers;
  
  useEffect(() => {
    
    if(bloggers){
      const filtered = bloggers?.filter(blogger => blogger.name.toLowerCase().includes(searchValue.toLowerCase()));

      setFilteredBloggers(filtered);
    }
    
  }, [bloggers,setFilteredBloggers,searchValue])
  
 
  if(isError) return <Error message={error.message} />

  return (
    <section className="exlpore bg-background text-content px-4 py-20 w-full md:w-[60%] h-full mt-[30px] md:mx-auto">
    
     
     
          <h1 className="text-2xl font-semibold mb-6">Checkout other bloggers :</h1>

          <div className="input w-full my-4">

            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="p-3 bg-card border-cta rounded-md font-semibold placeholder:text-content "
              placeholder="Search any blogger here..."
            />
          </div>

          <div className="bloggers-container h-[80%] w-full border-2 flex flex-col justify-between items-center border-gray-400 rounded-md p-4 overflow-scroll overflow-x-hidden">

            {isPending && <Loading />}
        {bloggers && <div className="bloggers w-full h-max flex flex-col gap-5 items-center justify-start py-8">
              
              {filteredBloggers?.map((item) => (
                <Blogger
                  bloggerName={item.name}
                  postsCount={item.blogPosts.length}
                  bloggerId={item._id.toString()}
                  profilePicture={item.profilePicture}
                  key={item._id}
                />
              ))}
            </div>}


          </div>
      
     


     

      
    </section>
  );
}

export default Explore;




