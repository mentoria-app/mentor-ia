from typing import List, Optional, Dict, Any
from supabase import Client
from datetime import datetime

from app.schemas.mentor import MentorCreate, MentorUpdate, Mentor

def create_mentor(client: Client, mentor_data: MentorCreate, user_id: str) -> Mentor:
    """
    Create a new mentor for a specific user.
    
    Args:
        client: Supabase client instance
        mentor_data: MentorCreate schema with mentor details
        user_id: ID of the user creating the mentor
        
    Returns:
        Mentor: The created mentor object
        
    Raises:
        Exception: If mentor creation fails
    """
    try:
        # Prepare mentor data for insertion
        mentor_dict = {
            "name": mentor_data.name,
            "description": mentor_data.description,
            "expertise": mentor_data.expertise,
            "avatar_url": mentor_data.avatar_url,
            "color": mentor_data.color,
            "user_id": user_id,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        # Insert mentor into database
        response = client.table("mentors").insert(mentor_dict).execute()
        
        if not response.data:
            raise Exception("Failed to create mentor")
        
        # Return the created mentor with proper datetime parsing
        mentor_data_result = response.data[0]
        if mentor_data_result.get('created_at') and isinstance(mentor_data_result['created_at'], str):
            mentor_data_result['created_at'] = datetime.fromisoformat(mentor_data_result['created_at'].replace('Z', '+00:00'))
        if mentor_data_result.get('updated_at') and isinstance(mentor_data_result['updated_at'], str):
            mentor_data_result['updated_at'] = datetime.fromisoformat(mentor_data_result['updated_at'].replace('Z', '+00:00'))
        
        return Mentor(**mentor_data_result)
        
    except Exception as e:
        raise Exception(f"Error creating mentor: {str(e)}")

def get_mentors_by_user(client: Client, user_id: str) -> List[Mentor]:
    """
    Get all mentors belonging to a specific user.
    
    Args:
        client: Supabase client instance
        user_id: ID of the user whose mentors to retrieve
        
    Returns:
        List[Mentor]: List of mentors belonging to the user
        
    Raises:
        Exception: If retrieval fails
    """
    try:
        # Query mentors for the specific user
        response = client.table("mentors").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        
        # Convert to Mentor objects with proper datetime parsing
        mentors = []
        for mentor_data in response.data:
            # Parse datetime strings if they exist
            if mentor_data.get('created_at') and isinstance(mentor_data['created_at'], str):
                mentor_data['created_at'] = datetime.fromisoformat(mentor_data['created_at'].replace('Z', '+00:00'))
            if mentor_data.get('updated_at') and isinstance(mentor_data['updated_at'], str):
                mentor_data['updated_at'] = datetime.fromisoformat(mentor_data['updated_at'].replace('Z', '+00:00'))
            
            mentors.append(Mentor(**mentor_data))
        
        return mentors
        
    except Exception as e:
        raise Exception(f"Error retrieving mentors: {str(e)}")

def get_mentor_by_id(client: Client, mentor_id: str, user_id: str) -> Optional[Mentor]:
    """
    Get a specific mentor by ID, ensuring it belongs to the user.
    
    Args:
        client: Supabase client instance
        mentor_id: ID of the mentor to retrieve
        user_id: ID of the user (for ownership verification)
        
    Returns:
        Optional[Mentor]: The mentor if found and owned by user, None otherwise
        
    Raises:
        Exception: If retrieval fails
    """
    try:
        # Query mentor with both ID and user_id for security
        response = client.table("mentors").select("*").eq("id", mentor_id).eq("user_id", user_id).execute()
        
        if not response.data:
            return None
        
        # Parse datetime strings if they exist
        mentor_data = response.data[0]
        if mentor_data.get('created_at') and isinstance(mentor_data['created_at'], str):
            mentor_data['created_at'] = datetime.fromisoformat(mentor_data['created_at'].replace('Z', '+00:00'))
        if mentor_data.get('updated_at') and isinstance(mentor_data['updated_at'], str):
            mentor_data['updated_at'] = datetime.fromisoformat(mentor_data['updated_at'].replace('Z', '+00:00'))
        
        return Mentor(**mentor_data)
        
    except Exception as e:
        raise Exception(f"Error retrieving mentor: {str(e)}")

def update_mentor(client: Client, mentor_id: str, update_data: MentorUpdate, user_id: str) -> Optional[Mentor]:
    """
    Update a mentor's information.
    
    Args:
        client: Supabase client instance
        mentor_id: ID of the mentor to update
        update_data: MentorUpdate schema with fields to update
        user_id: ID of the user (for ownership verification)
        
    Returns:
        Optional[Mentor]: The updated mentor if successful, None if not found
        
    Raises:
        Exception: If update fails
    """
    try:
        # Prepare update data, excluding None values
        update_dict = {}
        has_updates = False
        
        if update_data.name is not None:
            update_dict["name"] = update_data.name
            has_updates = True
        if update_data.description is not None:
            update_dict["description"] = update_data.description
            has_updates = True
        if update_data.expertise is not None:
            update_dict["expertise"] = update_data.expertise
            has_updates = True
        if update_data.avatar_url is not None:
            update_dict["avatar_url"] = update_data.avatar_url
            has_updates = True
        if update_data.color is not None:
            update_dict["color"] = update_data.color
            has_updates = True
        
        if not has_updates:
            # No fields to update, just return current mentor
            return get_mentor_by_id(client, mentor_id, user_id)
        
        # Always update the updated_at timestamp when there are actual changes
        update_dict["updated_at"] = datetime.utcnow().isoformat()
        
        # Update mentor with user_id filter for security
        response = client.table("mentors").update(update_dict).eq("id", mentor_id).eq("user_id", user_id).execute()
        
        if not response.data:
            return None
        
        # Parse datetime strings if they exist
        mentor_data = response.data[0]
        if mentor_data.get('created_at') and isinstance(mentor_data['created_at'], str):
            mentor_data['created_at'] = datetime.fromisoformat(mentor_data['created_at'].replace('Z', '+00:00'))
        if mentor_data.get('updated_at') and isinstance(mentor_data['updated_at'], str):
            mentor_data['updated_at'] = datetime.fromisoformat(mentor_data['updated_at'].replace('Z', '+00:00'))
        
        return Mentor(**mentor_data)
        
    except Exception as e:
        raise Exception(f"Error updating mentor: {str(e)}")

def delete_mentor(client: Client, mentor_id: str, user_id: str) -> bool:
    """
    Delete a mentor.
    
    Args:
        client: Supabase client instance
        mentor_id: ID of the mentor to delete
        user_id: ID of the user (for ownership verification)
        
    Returns:
        bool: True if deletion was successful, False if mentor not found
        
    Raises:
        Exception: If deletion fails
    """
    try:
        # Delete mentor with user_id filter for security
        response = client.table("mentors").delete().eq("id", mentor_id).eq("user_id", user_id).execute()
        
        # Check if any rows were affected
        return len(response.data) > 0
        
    except Exception as e:
        raise Exception(f"Error deleting mentor: {str(e)}") 