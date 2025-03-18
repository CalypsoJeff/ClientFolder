
const testimonials = [
  {
    quote: "ORCA transformed our workflow. The interface is so intuitive that our entire team was able to adapt within days, not weeks.",
    author: "Sarah Johnson",
    title: "Director of Product, Elevate Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256",
  },
  {
    quote: "The attention to detail is remarkable. ORCA anticipates needs before they arise, making our processes smoother and our team happier.",
    author: "Michael Chen",
    title: "CTO, Horizon Tech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256",
  },
  {
    quote: "Finally, software that respects both aesthetics and functionality. ORCA doesn't just look beautiful—it works beautifully.",
    author: "Emma Rodriguez",
    title: "Design Lead, Creative Pulse",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-orca-100 text-orca-800 text-xs font-medium tracking-wide">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Loved by forward-thinking teams
          </h2>
          <p className="text-gray-600 text-lg">
            See what others are saying about their experience with ORCA.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-white shadow-sm border border-gray-100 opacity-0"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
              data-animate="true"
            >
              <div className="mb-6">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.33341 21.3334C7.86675 21.3334 6.64453 20.8112 5.66675 19.7667C4.68897 18.7445 4.20008 17.5 4.20008 16.0334C4.20008 14.5667 4.66675 13.1889 5.60008 11.9C6.53341 10.6334 7.80008 9.33337 9.40008 8.00004L13.0667 12.4667C11.8667 13.4445 11.0334 14.3667 10.5667 15.2334C10.1001 16.1 9.86675 16.9667 9.86675 17.8334H12.8667C13.4001 17.8334 13.8445 18.0334 14.2 18.4334C14.5556 18.8112 14.7334 19.2445 14.7334 19.7334C14.7334 20.2667 14.5556 20.7223 14.2 21.1C13.8445 21.4778 13.4001 21.6667 12.8667 21.6667L9.33341 21.3334ZM21.3334 21.3334C19.8667 21.3334 18.6445 20.8112 17.6667 19.7667C16.689 18.7445 16.2001 17.5 16.2001 16.0334C16.2001 14.5667 16.6667 13.1889 17.6001 11.9C18.5334 10.6334 19.8001 9.33337 21.4001 8.00004L25.0667 12.4667C23.8667 13.4445 23.0334 14.3667 22.5667 15.2334C22.1001 16.1 21.8667 16.9667 21.8667 17.8334H24.8667C25.4001 17.8334 25.8445 18.0334 26.2 18.4334C26.5556 18.8112 26.7334 19.2445 26.7334 19.7334C26.7334 20.2667 26.5556 20.7223 26.2 21.1C25.8445 21.4778 25.4001 21.6667 24.8667 21.6667L21.3334 21.3334Z" fill="#E0F2FE"/>
                </svg>
              </div>
              
              <blockquote className="mb-6 text-lg text-gray-700">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
