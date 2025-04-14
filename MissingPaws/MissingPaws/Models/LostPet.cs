namespace MissingPaws.Models
{
    public class LostPet
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public DateTime MissingDate { get; set; }
        public string LastSeenLocation { get; set; } = "";
        public string ContactInfo { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public bool IsApproved { get; set; } = false;
    }
}
