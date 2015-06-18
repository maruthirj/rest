package com.mydomain.service;

import java.net.URI;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Link;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.mydomain.model.User;

@Path("/userhateoas")
public class UserHATEOASService {

	@GET
	@Path("/{id}")
	@Produces({MediaType.APPLICATION_JSON})
	public User getUser(@PathParam("id") Integer id) {
		Session ses = HibernateUtil.currentSession();
		try {
			Criteria crit =  ses.createCriteria(User.class);
			crit.add(Restrictions.idEq(id));
			User u = (User)crit.uniqueResult();
			return u;
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public List<User> getUsers(@Context UriInfo uriInfo) throws Exception {
		Session ses = HibernateUtil.currentSession();
		try {
			List<User> users = ses.createCriteria(User.class).list();
			for (User user : users) {
				UriBuilder editLinkBuilder = uriInfo.getAbsolutePathBuilder();
				editLinkBuilder.path(UserHATEOASService.class.getMethod("getUser", Integer.class));
				URI uri = editLinkBuilder.build(user.getId());
				System.out.println("URI: "+uri);
				Link edit = Link.fromUri(uri).rel("edit").type("application/json").build();
				user.getLinks().add(edit);
			}
			return users;
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	//public void createUser(@FormParam("name") String name,@FormParam("age") Integer age,@FormParam("emailId") String emailId){
	public void createUser(User u){
		System.out.println("Creating user: "+u.getName()+" Age: "+u.getAge());
		Session ses = HibernateUtil.currentSession();
		try {
			Transaction tx = ses.beginTransaction();
			ses.save(u);
			tx.commit();
		}finally{
			HibernateUtil.closeSession();
		}
	}
	
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	//@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	//public void updateUser(@FormParam("id") Integer id, @FormParam("name") String name,@FormParam("age") Integer age,@FormParam("emailId") String emailId){
	public void updateUser(User u){
		System.out.println("Updating user: "+u.getName());
		Session ses = HibernateUtil.currentSession();
		try {
			Transaction tx = ses.beginTransaction();
			ses.update(u);
			tx.commit();
		}finally{
			HibernateUtil.closeSession();
		}
	}
	
	@DELETE
	@Path("/{param}")
	@Produces({MediaType.APPLICATION_JSON})
	public boolean deleteUser(@PathParam("param") Integer id) {
		System.out.println("Deleting user: "+id);
		Session ses = HibernateUtil.currentSession();
		try {
			Transaction tx = ses.beginTransaction();
			User u = (User) ses.load(User.class, id);
			ses.delete(u);
			tx.commit();
			return true;
		} finally {
			HibernateUtil.closeSession();
		}
	}
	
}
