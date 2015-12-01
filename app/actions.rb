# Homepage (Root path)
get '/' do
  erb :index
end

get '/list' do
  all_contacts = Contact.all

  json all_contacts
end