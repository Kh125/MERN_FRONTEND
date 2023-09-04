import React from 'react'

const Notification = ()=>{
    return <>
 <div className="bg-custom-light-blue h-screen overflow-hidden">
        <div className="bg-custom-light-blue py-4">
            {/* Title Section */}
            <div className="px-4 my-5">
                <h1 className="text-custom-size-30 font-bold">Uni-Notify</h1>
            </div>
            <div className="px-4 my-6">
                <h1 className="text-custom-time text-custom-size-60 font-semibold text-right">
                    {} <span className="uppercase text-custom-color text-custom-size-30">{}</span>
                </h1>
            </div>
            <div className="px-4 my-4">
                <h1 className="text-2xl font-semibold text-custom-class-title">Upcoming Classes</h1>
            </div>
            {/* Title Section */}

            {/* Upcoming Class section */}
            <div className="bg-custom-blue pt-4 rounded-t-custom-t h-screen">
                <div class="flex space-x-6 justify-center mb-4">
                    <button class="bg-custom-dark text-white py-2 px-4 rounded-full w-28 h-12 font-semibold">
                        All
                    </button>
                    <button class="bg-white text-black py-2 px-4 rounded-full w-28 h-12 font-semibold">
                        New
                    </button>
                </div>
                <div className="overflow-y-scroll max-h-[500px] pt-2 pb-5">
                    
                </div>
            </div>
            {/* Upcoming Class section */}
        </div>
    </div>

    </>
}
export default Notification