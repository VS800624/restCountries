import './CountriesListShimmer.css';

const CountriesListShimmer = () => {
     // new Array(10).fill('')
    return (
        <div className="countries-container flex flex-wrap gap-6 justify-center">
            {Array.from({length: 10}).map((el, i) =>(
                <div key={i} className="country-card shimmer-card w-64 bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Skeleton for flag */}
                    <div className="h-[150px] bg-gray-200 animate-pulse"></div>

                    {/* Skeleton for text content */}
                    <div className="p-4">
                        <div className="h-6 w-3/4 bg-gray-200 rounded mb-[16px] animate-pulse"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded mb-[16px] animate-pulse"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded mb-[16px] animate-pulse"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CountriesListShimmer;
