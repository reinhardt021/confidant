# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  contacts = Contact.all
  json contacts
end

get '/contacts/find' do |id|
  contact = Contact.find(id)
  json contact
end

post '/contacts' do
  results = { result: false }
  firstname = params[:firstName]
  lastname = params[:lastName]
  email = params[:email]

  contact = Contact.new(
    firstname: firstname,
    lastname: lastname,
    email: email 
  )

  if contact.save
    results[:result] = true
    results[:contact] = contact
  end

  json results
end