from typing import List, Optional
from supabase import Client
from datetime import datetime

from app.schemas.resource import ResourceCreate, ResourceUpdate, Resource

def create_resource(client: Client, resource_data: ResourceCreate, user_id: str) -> Resource:
    """
    Create a new resource for a specific mentor.
    
    Args:
        client: Supabase client instance
        resource_data: ResourceCreate schema with resource details
        user_id: ID of the user (for mentor ownership verification)
        
    Returns:
        Resource: The created resource object
        
    Raises:
        Exception: If resource creation fails or mentor doesn't belong to user
    """
    try:
        # First verify that the mentor belongs to the user
        mentor_check = client.table("mentors").select("id").eq("id", resource_data.mentor_id).eq("user_id", user_id).execute()
        
        if not mentor_check.data:
            raise Exception("Mentor not found or doesn't belong to user")
        
        # Prepare resource data for insertion
        resource_dict = {
            "name": resource_data.name,
            "type": resource_data.type.value,
            "mentor_id": resource_data.mentor_id,
            "url": resource_data.url,
            "status": resource_data.status.value,
            "created_at": datetime.utcnow().isoformat(),
            "updated_at": datetime.utcnow().isoformat()
        }
        
        # Insert resource into database
        response = client.table("resources").insert(resource_dict).execute()
        
        if not response.data:
            raise Exception("Failed to create resource")
        
        # Return the created resource with proper datetime parsing
        resource_data_result = response.data[0]
        if resource_data_result.get('created_at') and isinstance(resource_data_result['created_at'], str):
            resource_data_result['created_at'] = datetime.fromisoformat(resource_data_result['created_at'].replace('Z', '+00:00'))
        if resource_data_result.get('updated_at') and isinstance(resource_data_result['updated_at'], str):
            resource_data_result['updated_at'] = datetime.fromisoformat(resource_data_result['updated_at'].replace('Z', '+00:00'))
        
        return Resource(**resource_data_result)
        
    except Exception as e:
        raise Exception(f"Error creating resource: {str(e)}")

def get_resources_by_mentor(client: Client, mentor_id: str, user_id: str) -> List[Resource]:
    """
    Get all resources belonging to a specific mentor.
    
    Args:
        client: Supabase client instance
        mentor_id: ID of the mentor whose resources to retrieve
        user_id: ID of the user (for mentor ownership verification)
        
    Returns:
        List[Resource]: List of resources belonging to the mentor
        
    Raises:
        Exception: If retrieval fails or mentor doesn't belong to user
    """
    try:
        # First verify that the mentor belongs to the user
        mentor_check = client.table("mentors").select("id").eq("id", mentor_id).eq("user_id", user_id).execute()
        
        if not mentor_check.data:
            raise Exception("Mentor not found or doesn't belong to user")
        
        # Query resources for the specific mentor
        response = client.table("resources").select("*").eq("mentor_id", mentor_id).order("created_at", desc=True).execute()
        
        # Convert to Resource objects with proper datetime parsing
        resources = []
        for resource_data in response.data:
            # Parse datetime strings if they exist
            if resource_data.get('created_at') and isinstance(resource_data['created_at'], str):
                resource_data['created_at'] = datetime.fromisoformat(resource_data['created_at'].replace('Z', '+00:00'))
            if resource_data.get('updated_at') and isinstance(resource_data['updated_at'], str):
                resource_data['updated_at'] = datetime.fromisoformat(resource_data['updated_at'].replace('Z', '+00:00'))
            
            resources.append(Resource(**resource_data))
        
        return resources
        
    except Exception as e:
        raise Exception(f"Error retrieving resources: {str(e)}")

def delete_resource(client: Client, resource_id: str, user_id: str) -> bool:
    """
    Delete a resource (with mentor ownership verification).
    
    Args:
        client: Supabase client instance
        resource_id: ID of the resource to delete
        user_id: ID of the user (for mentor ownership verification)
        
    Returns:
        bool: True if deletion was successful, False if resource not found
        
    Raises:
        Exception: If deletion fails
    """
    try:
        # Get resource with mentor verification through JOIN
        response = client.table("resources").select("*, mentors!inner(user_id)").eq("id", resource_id).execute()
        
        if not response.data:
            return False
        
        # Check if the mentor belongs to the user
        resource_data = response.data[0]
        if resource_data["mentors"]["user_id"] != user_id:
            raise Exception("Resource doesn't belong to user")
        
        # Delete the resource
        delete_response = client.table("resources").delete().eq("id", resource_id).execute()
        
        # Check if any rows were affected
        return len(delete_response.data) > 0
        
    except Exception as e:
        raise Exception(f"Error deleting resource: {str(e)}") 