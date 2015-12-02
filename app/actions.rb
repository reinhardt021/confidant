# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts' do
  contacts = Contact.all
  json contacts
end

get '/contacts/find' do
  results = { result: false }
  search = params[:search].strip

  if search
    search = "%#{search.to_s}%"     
  else
    search = ""
  end

  sql = "firstname LIKE ? OR lastname LIKE ? OR email LIKE ?"
  contacts = Contact.where(sql, search, search, search)

  if contact.any? # need to check if anything is returned
    results[:result] = true
    results[:contacts] = contacts
  end 

  json results
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